import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";



export default class EditExercise extends Component {

    constructor(props) {        
        super(props);       
        const params = window.location.href.split('/');
        this.editId  = (params[4]) ? params[4] : '';             
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            description: '',
            duration: 0,
            date: new Date(),
            users:[]
        }
    }

    componentDidMount() {     
        axios.get("http://localhost:8000/users/")
         .then(res => {
            if(res.data.length > 0) {
                this.setState({
                    users: res.data.map(user => user.username),                    
                })
            }
        })

        axios.get("http://localhost:8000/exercises/"+this.editId)
         .then(res => {
            if(res.data) {
                this.setState({                   
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date),
                });                
            }
         })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }
    
    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise);
        axios.post('http://localhost:8000/exercises/update/'+this.editId, exercise)
        .then((res) => {
            console.log(res.data)
            window.location='/';
        })
        .catch((err) => console.log(err));   
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Username: </label>
                        <select  
                            required
                            className='form-control'
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}</option>
                                })
                            } 
                        </select>
                    </div>
                    <div className="form-group">
                        <label> Description: </label>
                        <input 
                            type="text"
                            className='form-control'
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />                            
                    </div> 
                    <div className="form-group">
                        <label> Duration: </label>
                        <input 
                            type="text"
                            className='form-control'
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            /> 
                    </div> 
                    <div className="form-group">
                        <label> Date: </label>
                        <DatePicker
                            selected={this.state.date}    
                            onChange={this.onChangeDate}
                            />
                    </div>   
                    <div className="form-group pt-4">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div> 
                </form>
            </div>
        ) 
    }
}