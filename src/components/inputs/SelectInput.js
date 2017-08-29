import React from 'react'
import PropTypes from 'prop-types'

const SelectInput = ({
	label,
	name,
	value,
	onChange,
	children
}) => {
	return (
		<div className="field">
			<label className="label">{label}</label>
			<div className="select">
				<select
					name={name}
					value={value}
					onChange={onChange}
				>
					{children}
				</select>
			</div>
		</div>
	)
}

SelectInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	children: PropTypes.any,
}

export default SelectInput