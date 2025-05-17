

const  BaseTextInput = ({label,field,onChange}) => {

    return(
        <>
            <div className="mb-3">
                <label  className="form-label fw-semibold text-dark">{label}</label>
                <input  type="file" name={field} className="form-control"
                        accept="image/*" onChange={onChange}/>
            </div>


        </>

    )
}

export default BaseTextInput;
