import React, {Component} from 'react';

// function wait(ms){
//     var start = new Date().getTime();
//     var end = start;
//     while(end < start + ms) {
//         end = new Date().getTime();
//     }
// }

// function takeFirst(achiIds, t) {

//     let guy = [];
//     let sth = [];
    
//     for(let j = 0; j < Math.ceil(achiIds.length/t); j++) {
//         sth = [];
//         for(var i = 0; i < t; i++) {
//             if(achiIds[(j * t) + i] === undefined) {
//                 break;
//             }
//             fetch("https://api.guildwars2.com/v2/achievements/"+achiIds[(j * t) + i])
//             .then(res => res.json())
//             .then(
//                 (data) => console.log(data)
//             );
//         }
//         console.log(sth);
//         wait(5000);
//     }

// }

// let ar = [1,2,3,4,5,6];

// takeFirst(ar, 5);

class Achievements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.guildwars2.com/v2/achievements',
            error: null,
            isLoaded: false,
            achievements: []
        };
    }
    
    componentDidMount() {
        fetch(this.state.url)
        .then(res => res.json())
        .then(
            (result) => {
                var achis = result;

                const count = achis.length;
                const pages = Math.ceil(count/200);
                console.log("pages: "+pages);

                if(achis.length > 200) {
                    for(var i = 0; i < pages; i++) {
                        var page = achis.slice(0+i*200, 200+i*200);
                        fetch(this.state.url + "?ids=" + page)
                        .then(res => res.json())
                        .then(
                            (data) => {
                                this.setState({
                                    achievements: this.state.achievements.concat(data),
                                    isLoaded: true
                                });
                                console.log(this.state.achievements)
                            }
                        )
                    }
                }
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
  
    render() {
        const { error, isLoaded, achievements } = this.state;
        if (error) {
            return <div className="row col-12">Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div className="row col-12">Loading...</div>;
        }
        else {
            return (
                <div className="row col-12">
                        {achievements.map(achi => (
                        <div key={achi.id} className="col-3">

                        <img src={achi.icon} />

                        {achi.flags.map(function(f){
                            if(f !== "IgnoreNearlyComplete" && f !== "Hidden" && f !== "RepairOnLogin" && f !== "RequiresUnlock" && f !== "MoveToTop" && f !== "CategoryDisplay"){
                                return <span className="text-primary">{f} </span>;
                            }
                        })} {achi.name}
                        </div>
                        ))}
                </div>
            );
        }
    }
}

  export default Achievements;