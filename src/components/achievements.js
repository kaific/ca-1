import React, {Component} from 'react';

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

function takeFirst(achiIds, t) {

    let guy = [];
    let sth = [];
    
    for(let j = 0; j < Math.ceil(achiIds.length/t); j++) {
        sth = [];
        for(var i = 0; i < t; i++) {
            if(achiIds[(j * t) + i] === undefined) {
                break;
            }
            fetch("https://api.guildwars2.com/v2/achievements/"+achiIds[(j * t) + i])
            .then(res => res.json())
            .then(
                (data) => console.log(data)
            );
        }
        console.log(sth);
        wait(5000);
    }

}

let ar = [1,2,3,4,5,6];

takeFirst(ar, 5);

class Achievements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    
    componentDidMount() {
        fetch("https://api.guildwars2.com/v2/achievements")
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                isLoaded: true,
                items: result.map(item => ({id: item}))
            });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            }
        )
        // .then(
        //     (data) => {
        //         data.map(
        //             item => {
        //                 fetch("http://api.guildwars2.com/v2/achievements/" + item)
        //                 .then(res => res.json())
        //                 .then(
        //                     (result) => {
        //                         this.state.items.push(result);
        //                     },
        //                     this.setState({
        //                         isLoaded: true
        //                     })
        //                 )   
        //         });
        //     },
        //     (error) => {
        //         this.setState({
        //             isLoaded: true,
        //             error
        //         });
        //     }
        // )
    }
  
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <ul>
                        {items.map(item => (
                        <li key={item.id}>
                            {item.id}
                        </li>
                        ))}
                    </ul>
                </div>
            );
        }
        }
  }

  export default Achievements;