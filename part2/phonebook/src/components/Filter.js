const Filter = ({filterRef, handleChange}) => {
    return (
      <div>
          search string: <input ref={filterRef} onChange={handleChange} />
      </div>
    )
}

export default Filter;