let chart;

function calculateCost() {

    const USD_TO_INR = 85;

    const ec2Rate =
        parseFloat(document.getElementById("instanceType").value);

    const instanceCount =
        parseInt(document.getElementById("instanceCount").value);

    const instanceHours =
        parseInt(document.getElementById("instanceHours").value);

    const ec2Cost =
        ec2Rate * instanceCount * instanceHours;

    const ebsStorage =
        parseFloat(document.getElementById("ebsStorage").value);

    const ebsCost =
        ebsStorage * 0.11;

    const s3Storage =
        parseFloat(document.getElementById("s3Storage").value);

    const s3Cost =
        s3Storage * 0.025;

    const rdsRate =
        parseFloat(document.getElementById("rdsType").value);

    const rdsHours =
        parseFloat(document.getElementById("rdsHours").value);

    const rdsCost =
        rdsRate * rdsHours;

    const total =
        ec2Cost +
        ebsCost +
        s3Cost +
        rdsCost;

    document.getElementById("ec2Cost").innerText =
        ec2Cost.toFixed(2);

    document.getElementById("ebsCost").innerText =
        ebsCost.toFixed(2);

    document.getElementById("s3Cost").innerText =
        s3Cost.toFixed(2);

    document.getElementById("rdsCost").innerText =
        rdsCost.toFixed(2);

    document.getElementById("totalCost").innerText =
        total.toFixed(2);

    document.getElementById("totalINR").innerText =
        (total * USD_TO_INR).toFixed(2);

    document.getElementById("yearlyCost").innerText =
        (total * 12).toFixed(2);

    renderChart(ec2Cost, ebsCost, s3Cost, rdsCost);
}

function renderChart(ec2, ebs, s3, rds){

    const ctx =
        document.getElementById("costChart");

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx,{
        type:'pie',
        data:{
            labels:[
                'EC2',
                'EBS',
                'S3',
                'RDS'
            ],
            datasets:[{
                data:[
                    ec2,
                    ebs,
                    s3,
                    rds
                ]
            }]
        }
    });
}

function resetCalculator(){

    document.getElementById("instanceCount").value = 1;
    document.getElementById("instanceHours").value = 730;

    document.getElementById("ebsStorage").value = 20;

    document.getElementById("s3Storage").value = 50;

    document.getElementById("rdsHours").value = 730;

    document.getElementById("ec2Cost").innerText = "0";
    document.getElementById("ebsCost").innerText = "0";
    document.getElementById("s3Cost").innerText = "0";
    document.getElementById("rdsCost").innerText = "0";
    document.getElementById("totalCost").innerText = "0";
    document.getElementById("totalINR").innerText = "0";
    document.getElementById("yearlyCost").innerText = "0";

    if(chart){
        chart.destroy();
    }
}

calculateCost();
