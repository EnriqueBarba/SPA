import React from 'react'
import { WithAuthConsumer } from '../context/AuthContext'
import { updateProfile, register } from '../services/ApiService'
import { Redirect } from 'react-router-dom'

const COUNTRIES = ['Afghanistan', 'AlandIslands', 'Albania', 'Algeria', 'AmericanSamoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'AntiguaAndBarbuda', 'Argentina', 'Armenia',
  'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan',
  'Bolivia', 'BosniaAndHerzegovina', 'Botswana', 'BouvetIsland', 'Brazil', 'BritishIndianOceanTerritory' , 'BruneiDarussalam' , 'Bulgaria',
  'BurkinaFaso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'CapeVerde', 'CaymanIslands', 'CentralAfricanRepublic', 'Chad', 'Chile', 'China', 'ChristmasIsland',
  'CocosKeelingIslands', 'Colombia', 'Comoros', 'Congo', 'CongoDemocraticRepublic', 'CookIslands', 'CostaRica', 'CoteDIvoire', 'Croatia', 'Cuba', 'Cyprus',
  'CzechRepublic', 'Denmark', 'Djibouti', 'Dominica', 'DominicanRepublic', 'Ecuador', 'Egypt', 'ElSalvador', 'EquatorialGuinea', 'Eritrea', 'Estonia' , 'Ethiopia',
  'FalklandIslands', 'FaroeIslands', 'Fiji', 'Finland', 'France', 'FrenchGuiana', 'FrenchPolynesia', 'FrenchSouthernTerritories', 'Gabon', 'Gambia', 'Georgia',
  'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'GuineaBissau', 'Guyana', 'Haiti',
  'HeardIslandMcdonaldIslands', 'VaticanCityState', 'Honduras', 'HongKong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'IsleOfMan',
  'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan' , 'Kenya', 'Kiribati', 'Korea', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
  'Lesotho', 'Liberia', 'LibyanArabJamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia',  'Maldives',
  'Mali', 'Malta', 'MarshallIslands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro' ,
  'Montserrat', 'Morocco', 'Mozambique',  'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'NetherlandsAntilles', 'NewCaledonia', 'NewZealand', 'Nicaragua',
  'Niger', 'Nigeria', 'Niue', 'NorfolkIsland', 'NorthernMarianaIslands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'PalestinianTerritory', 'Panama', 'PapuaNewGuinea',
  'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'PuertoRico', 'Qatar', 'Reunion', 'Romania', 'RussianFederation', 'Rwanda', 'SaintBarthelemy',
  'SaintHelena', 'SaintKittsAndNevis', 'SaintLucia', 'SaintMartin', 'SaintPierreAndMiquelon', 'SaintVincentAndGrenadines', 'Samoa', 'SanMarino', 'SaoTomeAndPrincipe',
  'SaudiArabia', 'Senegal', 'Serbia', 'Seychelles', 'SierraLeone', 'Singapore', 'Slovakia', 'Slovenia', 'SolomonIslands', 'Somalia', 'SouthAfrica', 'SouthGeorgiaAndSandwichIsl',
  'Spain', 'SriLanka', 'Sudan', 'Suriname', 'SvalbardAndJanMayen', 'Swaziland', 'Sweden', 'Switzerland', 'SyrianArabRepublic', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand',
  'TimorLeste', 'Togo', 'Tokelau', 'Tonga', 'TrinidadAndTobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'TurksAndCaicosIslands', 'Tuvalu', 'Uganda', 'Ukraine', 'UnitedArabEmirates',
  'UnitedKingdom', 'UnitedStates', 'UnitedStatesOutlyingIslands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'VietNam', 'VirginIslandsBritish', 'VirginIslandsUS',
  'WallisAndFutuna', 'WesternSahara', 'Yemen', 'Zambia', 'Zimbabw']


const validators = {
    fullName: val => val.length >= 3,
    email: val => val.length > 5,
    password: val => val.length >= 8,
    country: val => COUNTRIES.includes(val),
    postalCode: val => val.length >= 5,
    street: val => val.length >= 6
  }

class UserForm extends React.Component {
    
    state= {
        data: {
            fullName:'',
            email: '',
            password: '',
            country: '',
            postalCode: '',
            street: '',
            id: null
        },
        error: {
            fullName: true,
            email: true,
            password: true,
            country: true,
            postalCode: true,
            street: true
        },
        touch: {
            fullName: false,
            email: false,
            password: false,
            country: false,
            postalCode: false,
            street: false
        },
        redirect: false
    }

    componentDidMount() {
        console.info('Props: ' + JSON.stringify(this.props.currentUser))
        if (this.props.currentUser) {
            const user = this.props.currentUser
            this.setState({
                ...this.state,
                data:{
                    id: user.id,
                    fullName: user.fullName,
                    password: '',
                    email: user.email,
                    country: user.address.country,
                    postalCode: user.address.postalCode,
                    street: user.address.street
                }
            })
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
                ...this.state.touch,
                [e.target.name]: true 
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();     
        const data = {...this.state.data}
        const obj = {
            fullName: data.fullName,
            password: data.password,
            email: data.email,
            country: data.country,
            postalCode: data.postalCode,
            street: data.street 
        }

        if (this.props.currentUser) {       
            updateProfile(obj).then(_ =>{
                this.props.logout()
            })
            
        } else {
            register(obj) 
        }


        this.setState({
            ...this.state,
            redirect:true
        })

    }
    
    render() {

        const {data, error, touch} = this.state;

        if (this.state.redirect){
            return <Redirect to='/login'/>
        }

        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <div className="form-group row mb-2">
                    <label className="" htmlFor='fullName'>Nombre completo: </label>
                    <input className="form-control" type='text' name='fullName' 
                        id='fullName' value={data.fullName} onChange={this.handleChange} onBlur={this.handleBlur}/>
                    <span className="icon is-small is-right">
                        {touch.fullName && !error.fullName && (
                            <i className="Success fa fa-check"></i>
                        )}
                        {touch.fullName && error.fullName && (
                            <i className="Error fa fa-exclamation-triangle"></i>
                        )}
                    </span>
                </div>

                <div className="form-group row mb-2">
                    <label className="" htmlFor='email'>Email: </label>
                    <input className="form-control" type='email' name='email' 
                        id='email' value={data.email} onChange={this.handleChange} onBlur={this.handleBlur}/>
                    <span className="icon is-small is-right">
                        {touch.email && !error.email && (
                            <i className="Success fa fa-check"></i>
                        )}
                        {touch.email && error.email && (
                            <i className="Error fa fa-exclamation-triangle"></i>
                        )}
                    </span>
                </div>

                <div className="form-group row mb-2">
                    <label className="" htmlFor='password'>Contraseña: </label>
                    <input className="form-control" type='password' name='password' 
                        id='password' value={data.password} onChange={this.handleChange} onBlur={this.handleBlur}/>
                    <span className="icon is-small is-right">
                        {touch.password && !error.password && (
                            <i className="Success fa fa-check"></i>
                        )}
                        {touch.password && error.password && (
                            <i className="Error fa fa-exclamation-triangle"></i>
                        )}
                    </span>
                </div>

                <div className="form-group row mb-2">
                    <label className="" htmlFor='country'>Pais: </label>
                    <select className="form-control" name='country' 
                        id='country' onChange={this.handleChange} onBlur={this.handleBlur}>
                        {COUNTRIES.map((e,i) => {
                                if (data.country === e ) {
                                    return <option selected key={i} value={e}>{e}</option>
                                } else {
                                    return <option key={i} value={e}>{e}</option>
                                }
                            })
                        }
                    </select>
                    <span className="icon is-small is-right">
                        {touch.country && !error.country && (
                            <i className="Success fa fa-check"></i>
                        )}
                        {touch.country && error.country && (
                            <i className="Error fa fa-exclamation-triangle"></i>
                        )}
                    </span>
                </div>

                <div className="form-group row mb-2">
                    <label className="" htmlFor='postalCode'>Codigo postal: </label>
                    <input className="form-control" type='text' name='postalCode' 
                        id='postalCode' value={data.postalCode} onChange={this.handleChange} onBlur={this.handleBlur}/>
                    <span className="icon is-small is-right">
                        {touch.postalCode && !error.postalCode && (
                            <i className="Success fa fa-check"></i>
                        )}
                        {touch.postalCode && error.postalCode && (
                            <i className="Error fa fa-exclamation-triangle"></i>
                        )}
                    </span>
                </div>

                <div className="form-group row mb-2">
                    <label className="" htmlFor='street'>Calle: </label>
                    <input className="form-control" type='text' name='street' 
                        id='street' value={data.street} onChange={this.handleChange} onBlur={this.handleBlur}/>
                    <span className="icon is-small is-right">
                        {touch.street && !error.street && (
                            <i className="Success fa fa-check"></i>
                        )}
                        {touch.street && error.street && (
                            <i className="Error fa fa-exclamation-triangle"></i>
                        )}
                    </span>
                </div>
                <div>
                    {data.id && <button className="btn btn-light gold-btn function-btn" type="submit">
                        <i className="fa fa-edit my-color-icon"></i> Editar
                        </button>}
                    {!data.id && <button className="btn btn-light gold-btn function-btn" type="submit">
                        <i className="fa fa-users my-color-icon"></i> Registrarse
                        </button>}
                </div>           
            </form>
        )
    }

}

export default WithAuthConsumer(UserForm)