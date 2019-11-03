import React, {Component} from 'react';

class Achievements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.guildwars2.com/v2/achievements',
            error: null,
            isLoaded: false,
            categories: [],
            achievements: []
        };
    }
    
    componentDidMount() {
        // GET ACHIEVEMENT IDS FROM API
        fetch(this.state.url)
        .then(res => res.json())
        .then(
            (result) => {
                var achis = result;
                const count = achis.length;

                // AMOUNT OF API CALLS NECESSARY
                const pages = Math.ceil(count/200);

                // Max number of items for "ids" parameter is 200, and if there is more than that
                // several API calls must be made
                if(achis.length > 200) {
                    // LOOP THROUGH ID ARRAY, SLICING IT EVERY 200 ITEMS
                    for(var i = 0; i < pages; i++) {
                        var page = achis.slice(0+i*200, 200+i*200);
                        // GET ACHIEVEMENT OBJECTS CORRESPONDING TO PART OF ID ARRAY FROM API
                        fetch(this.state.url + "?ids=" + page)
                        .then(res => res.json())
                        .then(
                            (data) => {
                                // CONCATENATE EACH SECTION TO THE ACHIEVEMENTS ARRAY WITHIN STATE
                                this.setState({
                                    achievements: this.state.achievements.concat(data),
                                    isLoaded: true
                                });
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
        // GET CATEGORY IDS FROM API
        .then(
            // Not checking if more than 200, because I know there's exactly 199
            fetch(this.state.url + "/categories")
            .then(res => res.json())
            .then(
                (result) => {
                    // GET CATEGORY OBJECTS BY REF IDs
                    fetch(this.state.url + "/categories?ids=" + result)
                    .then(res => res.json())
                    .then(
                        (allcats) => {
                            // SAVE CATEGORY OBJECTS
                            this.setState({
                                categories: allcats
                            })
                            // LOOP THROUGH CATEGORIES ARRAY TO
                            // GET EACH CATEGORY'S SUBARRAY WITH BELONGING ACHIEVEMENTS' IDS
                            // AND LOOP THROUGH ACHIEVEMENTS ARRAYS WITHIN TO
                            // ASSIGN EACH ACHIEVEMENT OBJECT OF STATE'S ACHI. ARRAY A "CATEGORY" PROPERTY
                            // WITH THE CORRESPONDING CAT. ID
                            this.state.categories.map(
                                cat => cat.achievements.map(
                                    achiId => this.state.achievements.map(
                                        achi => {
                                            if(achi.id === achiId) {
                                                achi.category = cat.id;
                                            }
                                        }
                                    )
                                )
                            );
                            console.log(this.state.achievements);
                        }
                    )
                    
                }
            )
        )
    }
  
    render() {
        const { error, isLoaded, achievements, categories } = this.state;
        if (error) {
            return <div className="row col-12">Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div className="row col-12">Loading...</div>;
        }
        else {
            return (
                <div className="row col-12">
                        {/* {achievements.map(achi => (
                        <div key={achi.id} className="col-4">
                            {achi.icon !== undefined ? 
                                <img alt="Special Icon" src={achi.icon} /> : 
                                ""
                            }

                            {achi.flags.map(function(f){
                                if(f !== "IgnoreNearlyComplete" && f !== "Hidden" && f !== "RepairOnLogin" && f !== "RequiresUnlock" && f !== "MoveToTop" && f !== "CategoryDisplay"){
                                    return <span key={f} className="text-primary">{f} </span>;
                                }
                                else return null;
                            })} {achi.name}
                        </div>
                        ))} */}

                        {
                            categories.map(
                                cat => (
                                    <div key={cat.id} className="col-4">
                                        
                                        {cat.name} {cat.achievements.map(
                                            id => " " + id
                                        )}
                                    </div>
                                )
                            )
                        }
                </div>
            );
        }
    }
}

  export default Achievements;