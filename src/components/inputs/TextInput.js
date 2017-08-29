import React from 'react'
import PropTypes from 'prop-types'

const TextInput = ({
	label,
	value,
	name,
	type,
	placeholder,
	autofocus,
	onChange
}) => {
	return (
		<div className="field">
			<label className="label">{label}</label>
			<div className="control">
				<input
					autoFocus={autofocus}
					className="input"
					type={type}
					placeholder={placeholder}
					name={name}
					value={value}
					onChange={onChange}
				/>
			</div>
		</div>
	)
}

TextInput.defaultProps = {
	type: 'text',
	autofocus: false,
}

TextInput.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
}

export default TextInput