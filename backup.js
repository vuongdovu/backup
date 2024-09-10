function backupPostgres({ host, user, password, database, output }) {
    const command = `PGPASSWORD=${password} pg_dump -h ${host} -U ${user} ${database} > ${output}`;
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error during PostgreSQL backup: ${stderr}`);
      } else {
        console.log(`PostgreSQL backup successful! File saved at ${output}`);
      }
    });
  }

  