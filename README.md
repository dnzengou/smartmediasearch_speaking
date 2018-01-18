# :mag: Smart Media Search

Progressive Web App for smart media search on pre-build text index with semantic item description

## demo

![Alt text](img/smartmediasearch_demo0.gif?raw=true "Gif short demo")


### run

* http-server -p port

## HOW IT WORKS

<p>Enter text to search video transcripts.</p>
<p style="border-bottom: 1px solid #444; padding: 0 0 1em 0;">Click on a result to view video.</p>
<p>A timed transcript file in VTT format for each videos is stored in the <em>tracks</em> folder. </p>

<!--<p>A dummy video and track element is created for each VTT file.</p>
<p>An entry in a WebSQL database is created for each cue of each track. Each database entry has the cue startTime, cue text, and YouTube video ID.</p>
<p>When text is entered in the query input element, the cue database is searched using a read query with LIKE, and results are displayed.</p>
<p>When a result is clicked, the <code>src</code> is set for the embedded YouTube player, with a start value corresponding to the start time of the cue.</p>-->

