

const  BaseTextInput = ({label,field,onChange,placeHolder}) => {

    return(
        <>
            <div className="mb-3">
                <label  className="form-label fw-semibold text-dark">{label}</label>
                <input  type="text" name={field} className="form-control"
                        placeholder={placeHolder}
                        onChange={onChange}
                        required/>
            </div>


        </>

    )
}

export default BaseTextInput;
