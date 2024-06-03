const Button = (props) =>{
    let style = "shadow-lg px-2 py-1 m-1 border-blue-400  text-blue-400 text-xl bg-white font-semibold rounded border hover:bg-blue-100 hover:shadow-sm hover:translate-y-0.5 transform transition"
    if(props.selected){
        style="shadow-lg px-2 py-1 border-blue-400  text-white text-xl bg-blue-400 font-semibold rounded border hover:shadow-sm hover:translate-y-0.5 transform transition"
    }
    return (
        <button className={style} onClick={props.onClick}>
            {props.value}
        </button>

    );
}
export default Button;