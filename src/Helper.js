export function fetchAll(state) {
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