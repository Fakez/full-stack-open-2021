const PersonForm = ({nameRef, phoneRef, handleSubmit}) => {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input ref={nameRef} /><br />
            number: <input ref={phoneRef} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
    )
}

export default PersonForm;