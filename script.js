let breathCondition, isAllowRenew, isWin, totalWinPercentage, nextWinPercentage, result, deathTimer
let pressTimes = 0
let totalLoseRate = 1
let isDeathTimer = false

function die(){
    document.getElementById("push").disabled = true
    document.getElementById("push").innerText = "死亡..."
    document.getElementById("push").style["background-color"] = "red"
}

document.getElementById("push").addEventListener("click", () => {
    breathCondition = document.getElementById("breathCondition").value
    isAllowRenew = document.getElementById("isAllowRenew").checked

    pressTimes++
    isWin = Math.random() < (0.5 ** pressTimes)
    totalLoseRate = totalLoseRate * (1 - (0.5 ** pressTimes))
    totalWinPercentage = `${(1 - totalLoseRate) * 100} %`
    nextWinPercentage = `${(0.5 ** (pressTimes + 1)) * 100} %`

    if(Boolean(breathCondition) && !isDeathTimer){
        deathTimer = setTimeout(die, Number(breathCondition))
        isDeathTimer = true
    }

    if(isWin){
        if(isDeathTimer){
            clearTimeout(deathTimer)
            isDeathTimer = false
        }
        if(!isAllowRenew){
            document.getElementById("push").disabled = true
            document.getElementById("push").innerText = "一億円!"
        }
        result = "一億円！"
    } else {
        result = "失敗"
    }

    document.getElementById("pressTimes").innerText = pressTimes
    document.getElementById("totalWinPercentage").innerText = totalWinPercentage
    document.getElementById("nextWinPercentage").innerText = nextWinPercentage

    document.getElementById("historyBody").insertAdjacentHTML("beforeend", `
        <tr>
            <td>${pressTimes}</td>
            <td>${totalWinPercentage}</td>
            <td>${nextWinPercentage}</td>
            <td>${result}</td>
        </tr>
    `)
})
