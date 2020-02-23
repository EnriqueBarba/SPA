import React from 'react'

const validators = {
    email: val => val.length > 3
  }

class UserForm extends React.Component {
    
    state= {
        data: {
            email: ''
        },
        error: {
            email: true
        },
        touch: {
            email: false
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        const isValid = validators[name](value)
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [name]: value
            },
            error: {
                ...this.state.error,
                [name]: !isValid
              }
        })
    }

    handleBlur = (e) => {
        this.setState({ 
            touch: { 
                [e.target.name]: true 
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.info('submit')
    }
    
    render() {

        const {data, error, touch} = this.state;

        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <div className="form-group row mb-2">
                    <label className="" htmlFor='email'>Email: </label>
                    <input className="form-control" type='email' name='email' id='email' value={data.email} onChange={this.handleChange} onBlur={this.handleBlur}/>
                    <span className="icon is-small is-right">
                        {touch.email && !error.email && (
                            <i className="Success fa fa-check"></i>
                        )}
                        {touch.email && error.email && (
                            <i className="Error fa fa-exclamation-triangle"></i>
                        )}
                    </span>
                </div>
                {JSON.stringify(this.state,null, "  ")}
            </form>
        )
    }

}

export default UserForm