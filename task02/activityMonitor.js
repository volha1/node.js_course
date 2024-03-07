 const childProcess = require('child_process');
 const fs = require('fs');
 const os = require('os');

 const isWindows = os.type() === 'Windows_NT';
 const command = isWindows ? 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"' : 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
 let count = 0;

  setInterval( () => {
    childProcess.exec(command, (error, stdout) => {
      count++;

      if (isWindows) {
        process.stdout.write(`${stdout.toString().trim()}\r`);
      } else {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(stdout.toString().trim());
      }

      if (count === 600) {
        const unixTime = Math.floor(Date.now() / 1000);

        fs.appendFile('activityMonitor.log', `${unixTime} : ${stdout}`, (err) => {
          if (err) throw err;
        });
        count = 0;
      }
    });
  }, 100)
