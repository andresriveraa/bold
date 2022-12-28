export const categories = [
  {value: "todos", name: 'todos', checked: true}, 
  {value: "link", name: 'link de pago', checked: true}, 
  {value: "datafono", name: 'datafono', checked: true}, 
]
export  const formatMoney = (number: number) => {
  return new Intl.NumberFormat().format(number)
};

export default categories;