const authLink = "https://www.strava.com/oauth/token"

function getActivities(res) {
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}&per_page=200`;
    fetch(activities_link)
        .then((res) => res.json())
        .then(function (data){
            const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
            mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxlYy1odWFuZy1sYWJzIiwiYSI6ImNrZzgzNnR0bjBkOWUycHBtYWVrOWRwa24ifQ.XF-6fJrDm7L_LLQcnE-VOw';
            var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/dark-v10', tileSize: 512, zoomOffset: -1,detectRetina: true, attribution: mbAttr})
            var map = L.map('map', {
                center: [40.77508184, -73.9525795],
                zoom: 13,
                layers: [grayscale]
            });
            for(let i=0; i<data.length; i++){
                //console.log(data[x].map.summary_polyline)
                var coordinates = L.Polyline.fromEncoded(data[i].map.summary_polyline).getLatLngs();
                console.log(coordinates)
                
                L.polyline(
                    coordinates,{
                        color:"red",
                        weight: 3,
                        opacity: 0.25,
                        linkeJoin: "round"
                    }
                ).addTo(map)
                
            }
            

        })
}

function reAuth(){
    fetch(authLink, {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: '54733',
            client_secret: '94390e3fb81c4de14d55c4983dc20388cbe628ef',
            refresh_token: '0cec6481e41265ed524b13a27262b3a4a74ee797',
            grant_type: 'refresh_token'
        })
    })
    .then(response => response.json())
        .then(response => getActivities(response))

}

reAuth();

//.then(response => console.log(response.json()))