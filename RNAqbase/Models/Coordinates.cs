using System;
using System.Text;

namespace RNAqbase.Models
{
	public class Coordinates
	{
		public string C1 { get; set; }
		public string C2 { get; set; }
		public string C3 { get; set; }
		public string C4 { get; set; }

		public string CoordinatesAsString
		{
			get
			{
				var sb = new StringBuilder();
				sb.Append(C1 + '\n');
				sb.Append(C2 + '\n');
				sb.Append(C3 + '\n');
				sb.Append(C4);
				Console.WriteLine(sb.ToString());
				return sb.ToString();
			}
		}

		private const string CoordinatesStart = "ATOM ";
	}
}
