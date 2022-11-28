using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Renci.SshNet;

namespace RNAqbase.Repository
{
	public class RepositoryBase
	{
		private readonly string connectionString;

		public RepositoryBase(IConfiguration configuration)
		{
			var (sshClient, localPort) = ConnectSsh();
			using (sshClient)
			{
				connectionString = configuration.GetConnectionString("RnaqbaseConnectionString");
			}
		}
		public static (SshClient SshClient, uint Port) ConnectSsh(string sshHostName = "150.254.30.116", string sshUserName = "sds", string sshPassword = "Yellow!Garb2",
			string sshKeyFile = null, string sshPassPhrase = null, int sshPort = 22, string databaseServer = "127.0.0.1", int databasePort = 15432)
		{
			// check arguments
			if (string.IsNullOrEmpty(sshHostName))
				throw new ArgumentException($"{nameof(sshHostName)} must be specified.", nameof(sshHostName));
			if (string.IsNullOrEmpty(sshHostName))
				throw new ArgumentException($"{nameof(sshUserName)} must be specified.", nameof(sshUserName));
			if (string.IsNullOrEmpty(sshPassword) && string.IsNullOrEmpty(sshKeyFile))
				throw new ArgumentException($"One of {nameof(sshPassword)} and {nameof(sshKeyFile)} must be specified.");
			if (string.IsNullOrEmpty(databaseServer))
				throw new ArgumentException($"{nameof(databaseServer)} must be specified.", nameof(databaseServer));

			// define the authentication methods to use (in order)
			var authenticationMethods = new List<AuthenticationMethod>();
			if (!string.IsNullOrEmpty(sshKeyFile))
			{
				authenticationMethods.Add(new PrivateKeyAuthenticationMethod(sshUserName,
					new PrivateKeyFile(sshKeyFile, string.IsNullOrEmpty(sshPassPhrase) ? null : sshPassPhrase)));
			}
			if (!string.IsNullOrEmpty(sshPassword))
			{
				authenticationMethods.Add(new PasswordAuthenticationMethod(sshUserName, sshPassword));
			}

			// connect to the SSH server
			var sshClient = new SshClient(sshHostName, sshUserName, sshPassword);//new ConnectionInfo(sshHostName, sshPort, sshUserName, authenticationMethods.ToArray()));
			sshClient.Connect();

			// forward a local port to the database server and port, using the SSH server
			//var forwardedPort = new ForwardedPortLocal(sshHostName, (uint)sshPort, databaseServer, (uint)databasePort);
			var forwardedPort = new ForwardedPortLocal("127.0.0.1", databaseServer, (uint)databasePort);
			sshClient.AddForwardedPort(forwardedPort);
			forwardedPort.Start();

			return (sshClient, forwardedPort.BoundPort);
		}
		internal IDbConnection Connection => new NpgsqlConnection(connectionString);
	}
}
