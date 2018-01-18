var accessToken = "2505e76bd7484b9eb1965dcee747222a",
    baseUrl = "https://api.api.ai/v1/",
    $speechInput,
    $recBtn,
    recognition,
    messageRecording = "Listening...",
    messageCouldntHear = "I might be young but I can't hear it all yet... Could you say that again?",
    messageInternalError = "OMG, there has been an internal server error",
    messageSorry = "I don't have the answer to that yet. But I will ;) Trust me,I'm an AI assistant!";

$(document).ready(function() {
    $speechInput = $("#query");
    $recBtn = $("#rec");

    $speechInput.keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            send();
        }
    });
    $recBtn.on("click", function(event) {
        switchRecognition();
    });
    $(".debug__btn").on("click", function() {
        $(this).next().toggleClass("is-active");
        return false;
    });
});

function startRecognition() {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function(event) {
        respond(messageRecording);
        updateRec();
    };
    recognition.onresult = function(event) {
        recognition.onend = null;

        var text = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }
        setInput(text);
        stopRecognition();
    };
    recognition.onend = function() {
        respond(messageCouldntHear);
        stopRecognition();
    };
    recognition.lang = "en-US";
    recognition.start();
}

function stopRecognition() {
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
    updateRec();
}

function switchRecognition() {
    if (recognition) {
        stopRecognition();
    } else {
        startRecognition();
    }
}

function setInput(text) {
    $speechInput.val(text);
    send();
}

function updateRec() {
    $recBtn.text(recognition ? "Stop" : "Speak");
}

function send() {
    var text = $speechInput.val();
    $.ajax({
        type: "POST",
        url: baseUrl + "query",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({
            query: text,
            lang: "en",
            sessionId: "desire-e1b18"
        }),

        success: function(data) {
            prepareResponse(data);
        },
        error: function() {
            respond(messageInternalError);
        }
    });
}

function prepareResponse(val) {
    var debugJSON = JSON.stringify(val, undefined, 2),
        spokenResponse = val.result.speech;

    respond(spokenResponse);
    debugRespond(debugJSON);
}

function debugRespond(val) {
    $("#response").text(val);
}

function respond(val) {
    if (val == "") {
        val = messageSorry;
    }

    if (val !== messageRecording) {
        var msg = new SpeechSynthesisUtterance();
        msg.voiceURI = "native";
        msg.text = val;
        msg.lang = "en-US";
        window.speechSynthesis.speak(msg);
    }

    $("#spokenResponse").addClass("is-active").find(".spoken-response__text").html(val);
}