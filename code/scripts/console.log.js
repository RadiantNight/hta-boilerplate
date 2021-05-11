var CONSOLELOG = {};
CONSOLELOG['directory'] = location.href.split('/').slice(0, -1).join("\\").replace("file:\\\\\\","").replace(/%20/g," ");
CONSOLELOG['hta'] = CONSOLELOG['directory'] + '\\console.log.hta';
CONSOLELOG['log'] = CONSOLELOG['directory'] + '\\console.log';
CONSOLELOG['fso'] = new ActiveXObject("Scripting.FileSystemObject");
CONSOLELOG['fso file'];

// (Create and) clear the console log for a new session
CONSOLELOG['fso file'] = CONSOLELOG['fso'].OpenTextFile(CONSOLELOG['log'], 2, true); // OpenTextFile(filePath, 2 = (Over)write File Contents, true = Create the file if it doesn't exist)
CONSOLELOG['fso file'].Write('');
CONSOLELOG['fso file'].Close();

// Suppress Some Errors
window.onerror = function(message, origin, lineNo, columnNo, error) {
	consoleLog("Error",error.stack);
	return true; // Set the return to true to block script error alerts
}

function consoleLog(type, message) {
	CONSOLELOG['fso file'] = CONSOLELOG['fso'].OpenTextFile(CONSOLELOG['log'], 8, true); // OpenTextFile(filePath, 8 = Append File Contents, true = Create the file if it doesn't exist)
	CONSOLELOG['fso file'].Write("[" + new Date().toUTCString() + "]" + type + ": " + message + "\r\n\r\n");
	CONSOLELOG['fso file'].Close();
}

(function() {
	console.log = function(txt) { consoleLog("Log", txt); }
	console.error = function(txt) { consoleLog("Error", txt); }
})();

// Keybind shortcuts
document.addEventListener("keydown", function (event) {
	// F12 tries to open console.log.hta. If it doesn't exist, create it
	if (event.key == 'F12') {
		//try {
			var html = '<!DOCTYPE html>' + "\r\n" +
			'<html lang="en">' + "\r\n" +
			'<head>' + "\r\n" +
			'<title>Console Log</title>' + "\r\n" +
			'<meta http-equiv="Content-Type" content="text/html" charset=utf-8>' + "\r\n" +
			'<meta http-equiv="X-UA-Compatible" content="IE=10">' + "\r\n" +
			'<script language="javascript">' + "\r\n" +
			'var w = 1200;' + "\r\n" +
			'var h = 800' + "\r\n" +
			'window.resizeTo (w,h);' + "\r\n" +
			'window.moveTo ((screen.availWidth - w) / 2, (screen.availHeight - h) / 2); // Centered' + "\r\n" +
			'</script>' + "\r\n" +
			'<HTA:APPLICATION' + "\r\n" +
			'	WINDOWSTATE="maximize"' + "\r\n" +
			'/>' + "\r\n" +
			'</head>' + "\r\n" +
			'<body style="font-family:sans-serif;font-size:16px">' + "\r\n" +
			'	<b>Console Log</b><hr>' + "\r\n" +
			'	<div id="consoleLog"></div>' + "\r\n" +
			'</body>' + "\r\n" +
			
			'<script language="javascript">' + "\r\n" +
			'var consoleLogFSO = new ActiveXObject(\'Scripting.FileSystemObject\');' + "\r\n" +
			'var consoleLogFSOFile;' + "\r\n" +
			'var consoleLogPath = "' + CONSOLELOG['log'].replace(/\\/g,"\\\\") + '";' + "\r\n" +
			'getConsoleLog();' + "\r\n" +
			'function getConsoleLog() {' + "\r\n" +
			'	var consoleLog = "";' + "\r\n" +
			'	try {' + "\r\n" +
			'		consoleLogFSOFile = consoleLogFSO.OpenTextFile(consoleLogPath, 1, true);' + "\r\n" +
			'		while(!consoleLogFSOFile.AtEndOfStream) {' + "\r\n" +
			'			var line = consoleLogFSOFile.ReadLine();' + "\r\n" +
			'			if (line.indexOf(\'Error:\') > -1) {' + "\r\n" +
			'				line = \'<font color="red">\' + line + \'</font>\';' + "\r\n" +
			'			}' + "\r\n" +
			'			consoleLog += line + \'<br>\';' + "\r\n" +
			'		}' + "\r\n" +
			'		consoleLogFSOFile.Close();' + "\r\n" +
			'		if (consoleLog != document.querySelector(\'#consoleLog\').innerHTML) {' + "\r\n" +
			'			document.querySelector(\'#consoleLog\').innerHTML = consoleLog;' + "\r\n" +
			'		}' + "\r\n" +
			'	} catch(error) {}' + "\r\n" +
			'	var scanning = setTimeout(getConsoleLog, 1000);' + "\r\n" +
			'}' + "\r\n" +
			'</script>' + "\r\n" +
			'</html>';
			
			CONSOLELOG['fso file'] = CONSOLELOG['fso'].OpenTextFile(CONSOLELOG['hta'], 2, true);
			CONSOLELOG['fso file'].Write(html);
			CONSOLELOG['fso file'].Close();
		//}
		//catch (error) {
		//	console.error('Unable to create or update console.log.hta.');
		//}
		
		try {
			
			var filePath = location.href.split('/').slice(0, -1).join('/') + '/console.log.hta';
			
			if (document.querySelector('#consoleLogLauncher') === null) {
				var consoleLogIframe = document.createElement('iframe');
				consoleLogIframe.id = 'consoleLogLauncher';
				consoleLogIframe.setAttribute('name','consoleLogLauncher');
				consoleLogIframe.setAttribute('style','display:none');
				document.querySelector('body').appendChild(consoleLogIframe);
				
			}
			window.open(filePath, 'consoleLogLauncher');
			console.log(filePath + ' has been launched.');
		}
		catch (error) {
			console.error('Unable to launch console.log.hta.');
		}
	}
});