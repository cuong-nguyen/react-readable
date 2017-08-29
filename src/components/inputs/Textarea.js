import React from 'react'
import PropTypes from 'prop-types'

const Textarea = ({
	label,
	name,
	value,
	onChange,
	placeholder
}) => {
	return (
		<div className="field">
			<label className="label">{label}</label>
			<div className="control">
				<textarea
					value={value}
					name={name}
					onChange={onChange}
					className="textarea"
					type="email"
					placeholder={placeholder}
				>
				</textarea>
			</div>
		</div>
	)
}

Textarea.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
}

export default Textarea