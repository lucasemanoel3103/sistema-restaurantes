/* Este arquivo serve para "ensinar" o TypeScript
  a entender o que são arquivos .scss, .css, etc. 
*/

// Declaração para arquivos .module.scss (CSS Modules)
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Declaração para arquivos .scss e .css globais
declare module '*.scss' {
  const content: any;
  export default content;
}

declare module '*.css' {
  const content: any;
  export default content;
}