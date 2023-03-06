const shellCommand = (command) => new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            log('ERROR: Could not execute the shell command: ' + command);
            reject('ERROR');
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            log('ERROR: Could not execute the shell command: ' + command);
            reject('STD_ERROR');
        }
        resolve(stdout);
    });
});
const log = message => {
    const content = `${message}\n`;
    console.log(message);
    try {
        fs.writeFileSync('log.log', content, { flag: 'a' });
    } catch (err) {
        console.error(err);
    }
}
const run = async () => {
    await shellCommand('git config --global user.email "sonesson8909@hotmail.com"')
    await shellCommand('git config --global user.name "ToWelie89"')
    await shellCommand('hexo new post test-12345');
    await shellCommand('hexo deploy');
}

run();