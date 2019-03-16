import React, {Component} from 'react';
import './../style/css/app.css'
import Logo from './../images/logo.png'
import Person from './../images/person.png'
import io from "socket.io-client"

export default class Home  extends Component {
    constructor(props){
        super(props);
        this.state={
            nome: '',
            comentario: '',
            getTweet: false

        }
    }

    componentDidMount(){
        this.socket = io.connect("http://localhost:3001", {reconnect: true})
        this.socket.on("envFrontend", data => {
            console.log('chegou aqui')
            this.setState({
                nome: data.nome,
                comentario: data.comentario,
                getTweet: data.verif
            })
            if(data){
              setTimeout(() => this.setState({getTweet: false}), 10000)
            }
        })


    }

    render(){
        return(
            <div className={'container'}>
                <div className={'telao'}>
                    <div className={'title'}>Telão</div>
                    <div className={'logoGlobo'}><img src={Logo}/></div>
                    <div className={(this.state.getTweet) ? 'tweetsV' : 'tweetsF'}>
                        <div className={'comentarioHeader'}>
                            <div className={'avatar'}><img src={Person}/></div>
                            <div className={'name'}>{this.state.nome}<div>@nome</div></div>
                        </div>
                        <div className={'comentarioBody'}>
                            <div>{this.state.comentario}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
