async function getMatchData() {

    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=337386d9-19dc-435d-845a-1cf2c7766e1e")
        .then(data => data.json())
        .then(data => {
            if (data.status != "success")return;

            const matchesList = data.data;

            if(!matchesList)return [];
            
            //add your api key from cricketdata.org
            const relevantData = matchesList.filter(match => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e").map(match => `${match.name}, ${match.status}.<br> <img src="${match.teamInfo[0].img}" alt=""> ${match.teamInfo[0].shortname}- ${match.score[0].r}/${match.score[0].w}, (${match.score[0].o}) <br> <img src="${match.teamInfo[1].img}" alt=""> ${match.teamInfo[1].shortname}- ${match.score[1].r}/${match.score[1].w}, (${match.score[1].o})`);
            
            console.log({relevantData});

            document.getElementById("matches").innerHTML = relevantData.map(match => `<li>${match} </li>`).join('');

            return relevantData;

        })
        .catch(e => console.log(e));
}
console.log("helllo !");

getMatchData();

const refreshButton = document.querySelector(".refresh");
refreshButton.addEventListener('click', getMatchData);
