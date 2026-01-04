import fs from 'fs';
import path from 'path';

const SESSION_DATA_PATH = process.env.COPILOT_SESSION_DATA || path.join(process.cwd(), '.copilot/sessions');

function getSessionDirectories(): string[] {
    if (!fs.existsSync(SESSION_DATA_PATH)) {
        return [];
    }
    return fs.readdirSync(SESSION_DATA_PATH)
        .map(name => path.join(SESSION_DATA_PATH, name))
        .filter(fullPath => fs.statSync(fullPath).isDirectory());
}

function purge(iterations?: number) {
    const sessions = getSessionDirectories();
    
    // Sort by modification time, most recent first
    sessions.sort((a, b) => {
        return fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime();
    });

    const toDelete = iterations === undefined ? sessions : sessions.slice(0, iterations);

    if (toDelete.length === 0) {
        console.log('No sessions to purge.');
        return;
    }

    console.log(`Purging ${toDelete.length} sessions...`);
    toDelete.forEach(dir => {
        console.log(`Deleting ${dir}`);
        fs.rmSync(dir, { recursive: true, force: true });
    });
    console.log('Done.');
}

function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === 'purge') {
        let iterations: number | undefined;
        const iIndex = args.indexOf('-i');
        const iterIndex = args.indexOf('--iterations');
        
        if (iIndex !== -1 && args[iIndex + 1]) {
            iterations = parseInt(args[iIndex + 1], 10);
        } else if (iterIndex !== -1 && args[iterIndex + 1]) {
            iterations = parseInt(args[iterIndex + 1], 10);
        }

        purge(iterations);
    } else {
        console.log('Usage: node copilot/packages/session/src/index.ts purge [-i <iterations>]');
    }
}

main();
