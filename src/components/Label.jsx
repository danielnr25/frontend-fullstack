const Label = ({text, htmlfor, labelclass}) => {
  return (
    <label
        htmlFor={htmlfor}
        className={labelclass}
    >
       {text}
    </label>
  )
}

export default Label