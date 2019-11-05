/* 
    THIS DEPRECATED CODE I CUT OUT FROM THE ACHIEVEMENT COMPONENT
*/

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
// ------
then(
    (result) => {
        // GET CATEGORY OBJECTS BY REF IDs
        fetch(this.state.url + "/categories?ids=" + result)
        .then(res => res.json())
        .then(
            (allcats) => {
                // SAVE CATEGORY OBJECTS
                this.setState({
                    categories: allcats,
                    isLoaded: true
                })
            }
        )
        
    },
    (error) => {
        this.setState({
            isLoaded: true,
            error
        });
    }
)

// ------

// LOOP THROUGH CATEGORIES ARRAY TO
        // GET EACH CATEGORY'S SUBARRAY WITH ITS ACHIEVEMENTS' IDS
        // AND LOOP THROUGH ACHIEVEMENTS ARRAYS WITHIN TO
        // ASSIGN EACH ACHIEVEMENT OBJECT OF A "CATEGORY" PROPERTY
        // WITH THE CORRESPONDING CAT. ID
        categories.map(
            cat => cat.achievements.map(
                achiId => achievements.map(
                    achi => {
                        if(achi.id === achiId) {
                            achi.category = cat.id;
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                )
            )
        );
        console.log(categories);