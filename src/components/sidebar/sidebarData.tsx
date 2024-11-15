import {
  FaFileAlt,
  FaTruck,
  FaMapMarkedAlt,
  FaEdit,
  FaTools,
  FaShoppingCart,
  FaWallet,
} from "react-icons/fa";

const sidebarData = [
  {
    label: "Logística",
    key: "Logistica",
    icon: <FaFileAlt />,
    buttons: [
      { label: "HReparto", icon: <FaTruck />, componentKey: "HRepList" },
      { label: "HRuta", icon: <FaMapMarkedAlt />, componentKey: "HRutaList" },
      { label: "Remito", icon: <FaEdit />, componentKey: "RemitosList" },
      { label: "Proforma", icon: <FaTruck />, componentKey: "Placeholder" },
      { label: "Remitentes", icon: <FaTruck />, componentKey: "Placeholder" },
      {
        label: "Destinatarios",
        icon: <FaTruck />,
        componentKey: "Placeholder",
      },
      {
        label: "Lista Precios",
        icon: <FaTruck />,
        componentKey: "Placeholder",
      },
    ],
  },
  {
    label: "Maquinarias",
    key: "Maquinarias",
    icon: <FaTools />,
    buttons: [
      { label: "Ejemplo", icon: <FaTruck />, componentKey: "HRepartoForm" },
    ],
  },
  {
    label: "Compras",
    key: "Compras",
    icon: <FaShoppingCart />,
    buttons: [
      { label: "Ejemplo", icon: <FaTruck />, componentKey: "HRepartoForm" },
    ],
  },
  {
    label: "Ventas",
    key: "Ventas",
    icon: <FaWallet />,
    buttons: [
      { label: "Facturación", icon: <FaTruck />, componentKey: "FactForm" },
    ],
  },
  {
    label: "Tesorería",
    key: "Tesoreria",
    icon: <FaWallet />,
    buttons: [
      { label: "Ejemplo", icon: <FaTruck />, componentKey: "HRepartoForm" },
    ],
  },
];

export default sidebarData;
