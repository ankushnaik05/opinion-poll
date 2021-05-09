
var canvas = document.getElementById('myChart');

var option = {
    animation: {
        duration: 5000
    }

};



async function renderChart(e) {

    var getSelectedValue = document.querySelector(
        'input[name="authers"]:checked');

    if (getSelectedValue != null) {
        document.getElementById("disp").innerHTML
            = getSelectedValue.value
            + " authers is selected";
    }
    else {
        document.getElementById("error").innerHTML
            = "*You have not selected any authers";
    }
    let Formauthor = {
        item: getSelectedValue.value
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(Formauthor),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await fetch("http://localhost:3000/add-vote", options)
        .then(res => res.json())
        .then(res => console.log(res));

    await fetch('http://localhost:3000/fetch-votes')
        .then(response => {
            return response.json();
        }).then(vote => {
            var data = {
                labels: Object.keys(vote.vote),
                datasets: [
                    {
                        label: "Votes",
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        borderWidth: 2,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        data: Object.values(vote.vote),
                    }
                ]
            };
            var myBarChart = Chart.Bar(canvas, {
                data: data,
                options: option
            });

        })
        .catch(err => console.log(err))
    var ctxLine = document.getElementById("myChart").getContext("2d");
    if (window.bar != undefined)
        window.bar.destroy();
    window.bar = new Chart(ctxLine, {});

    color[renderChart(data)] = 'red';

    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'value',
                data: data,
                backgroundColor: color,
            }]
        }
    });


}

