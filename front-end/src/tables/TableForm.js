import React from "react";

function CreateTable({ handleCancel, handleSubmit, table, setTable }) {
	const handleChange = ({ target }) => {
		setTable({
			...table,
			[target.name]: target.value,
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
        table.capacity = Number(table.capacity);
		handleSubmit(table);
	};

	return (
		
			<form onSubmit={onSubmit}>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="table_name">Table name</label>
						<input
							id="table_name"
							type="text"
							name="table_name"
							min={"2"}
							onChange={handleChange}
							value={table.table_name}
							required
							className="form-control"
						/>
					</div>
					<div className="form-group col-md-6">
						<label htmlFor="capacity">Capacity</label>
						<input
							id="capacity"
							type="number"
							name="capacity"
							min={"1"}
							onChange={handleChange}
							value={table.capacity}
							required
							className="form-control"
						/>
					</div>
				</div>
			
			<div className="row justify-content-md-center">
				<button
					class="btn btn-secondary mr-2 cancel"
					type="button"
					onClick={handleCancel}
				>
					<span className="oi oi-x">Cancel</span>
				</button>
				<button class="btn btn-primary" type="submit">
					<span className="oi oi-check">Submit</span>
				</button>
			</div>
		</form>
	);
}

export default CreateTable;
