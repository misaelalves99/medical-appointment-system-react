// src/__mocks__/fileMock.ts

const fileMock = 'test-file-stub';

export default fileMock;

// Algumas configs de Jest esperam também um "ReactComponent" para SVGs.
// Se você precisar, pode descomentar o trecho abaixo:
//
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const ReactComponent = (props: any) => {
//   return {
//     $$typeof: Symbol.for('react.element'),
//     type: 'svg',
//     ref: null,
//     key: null,
//     props: {
//       ...props,
//     },
//   };
// };
