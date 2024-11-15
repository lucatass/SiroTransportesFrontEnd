// RemitosView.tsx
import React, { useState, useRef } from "react";
import Modal from "react-modal";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Box } from "@mui/material";
import useRemitosStore from "../../store/remitoStore";
import RemitosForm from "../../components/remito/RemitosForm";
import { remitoColumnDefs } from "../../components/remito/remitoConstants";
import { useRemitoFilters, useSnackbar, useDialog } from "../../hooks";
import {
  SnackbarNotification,
  ConfirmDelete,
  ActionButton,
  FilterFields,
  DataTable,
  DataTableRef,
} from "../../components/common";
import {
  fetchRemitos,
  addRemitoApi,
  updateRemitoApi,
  deleteRemitoApi,
} from "../../api/remito-service";
import { RemitoDto } from "../../types/types";
import "./RemitosView.css";

dayjs.extend(customParseFormat);

const RemitosList: React.FC = () => {
  const { isFormOpen, openForm, closeForm, selectedRemito } = useRemitosStore();
  const queryClient: QueryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery<RemitoDto[], Error>({
    queryKey: ["remitos"],
    queryFn: () => fetchRemitos(),
    staleTime: 1000 * 60 * 5, // 5 minutos para actualizar
  });

  const {
    fechaDesde,
    fechaHasta,
    errorFecha,
    handleFechaDesdeChange,
    handleFechaHastaChange,
    filteredRowData,
  } = useRemitoFilters(data || []);

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    openSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const { isOpen: dialogOpen, openDialog, closeDialog } = useDialog();
  const [searchText, setSearchText] = useState("");
  const [remitoToDelete, setRemitoToDelete] = useState<RemitoDto | null>(null);
  const dataTableRef = useRef<DataTableRef>(null);

  // Mutaciones
  const addRemitoMutation = useMutation<RemitoDto, Error, RemitoDto>({
    mutationFn: addRemitoApi,
    onSuccess: (newRemito) => {
      console.log("Remito agregado exitosamente:", newRemito);
      queryClient.setQueryData<RemitoDto[]>(["remitos"], (oldData) => {
        return oldData ? [...oldData, newRemito] : [newRemito];
      });
      openSnackbar("Remito agregado exitosamente.", "success");
    },
    onError: () => {
      openSnackbar("Error al agregar el remito.", "error");
    },
  });

  // Actualizar Remito
  const updateRemitoMutation = useMutation<RemitoDto, Error, RemitoDto>({
    mutationFn: updateRemitoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["remitos"],
      });
      openSnackbar("Remito actualizado exitosamente.", "success");
    },
    onError: () => {
      openSnackbar("Error al actualizar el remito.", "error");
    },
  });

  // Eliminar Remito
  const deleteRemitoMutation = useMutation<void, Error, string>({
    mutationFn: deleteRemitoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["remitos"],
      });
      openSnackbar("Remito eliminado exitosamente.", "success");
    },
    onError: () => {
      openSnackbar("Error al eliminar el remito.", "error");
    },
  });

  if (isLoading) return <p>Cargando remitos...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  const handleFormSubmit = (remito: RemitoDto) => {
    if (selectedRemito) {
      updateRemitoMutation.mutate(remito);
    } else {
      addRemitoMutation.mutate(remito);
    }
    closeForm();
  };

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const actions = {
    abrirRemito: (data: RemitoDto) => openForm(data),
    imprimirRemito: (data: RemitoDto) => console.log("Imprimir Remito:", data),
    handleDeleteClick: (data: RemitoDto) => {
      setRemitoToDelete(data);
      openDialog();
    },
    confirmDelete: () => {
      if (remitoToDelete) {
        deleteRemitoMutation.mutate(remitoToDelete.id);
        setRemitoToDelete(null);
        closeDialog();
      }
    },
    cancelDelete: () => {
      setRemitoToDelete(null);
      closeDialog();
    },
  };

  const handleExport = () => dataTableRef.current?.exportToExcel();

  return (
    <div className="remitos-list">
      {/* Botones de Añadir y Exportar */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <ActionButton onAdd={() => openForm(null)} onExport={handleExport} />
          
        <FilterFields
          fechaDesde={fechaDesde}
          fechaHasta={fechaHasta}
          errorFecha={errorFecha}
          onFechaDesdeChange={handleFechaDesdeChange}
          onFechaHastaChange={handleFechaHastaChange}
          searchText={searchText}
          onSearchTextChange={onSearch}
        />
      </Box>

      {/* Tabla AgGrid */}
      <DataTable
        ref={dataTableRef}
        rowData={filteredRowData || []}
        columnDefs={remitoColumnDefs}
        onEdit={actions.abrirRemito}
        onPrint={actions.imprimirRemito}
        onDelete={actions.handleDeleteClick}
        searchText={searchText}
      />

      {/* Modal para Añadir/Editar Remito */}
      <Modal
        isOpen={isFormOpen}
        onRequestClose={closeForm}
        contentLabel={selectedRemito ? "Editar Remito" : "Añadir Remito"}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <span className="close" onClick={closeForm}>
          &times;
        </span>
        <RemitosForm initialData={selectedRemito} onSubmit={handleFormSubmit} />
      </Modal>

      {/* Dialog de Confirmación para Eliminar */}
      <ConfirmDelete
        open={dialogOpen}
        onCancel={actions.cancelDelete}
        onConfirm={actions.confirmDelete}
      />

      {/* Snackbar para Notificaciones */}
      <SnackbarNotification
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={closeSnackbar}
      />
    </div>
  );
};

export default RemitosList;
