const Button = ({nombre}) => {
  return (
    <button className="w-full bg-indigo-800 text-white font-bold rounded-full py-3 tracking-widest hover:bg-indigo-900 transition cursor-pointer">{nombre}</button>
  )
}

export default Button