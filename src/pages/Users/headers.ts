const createLabelHeader = (label: string) => ({ label });

export const headersUsers: { label: string }[] = [
  createLabelHeader("Nome do usuário"),
  createLabelHeader("E-mail"),
  createLabelHeader("Tipo de usuário"),
  createLabelHeader("Alterar senha"),
  createLabelHeader("Excluir usuário"),
];
