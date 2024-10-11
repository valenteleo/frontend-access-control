export const translateStatus = (status: string) => {
  switch (status) {
    case "agendado":
      return "Agendado";
    case "atendido":
      return "Atendido";
    case "omisso":
      return "Omisso";
    case "cancelado":
      return "Cancelado";
    default:
      return "Sem status";
  }
};
