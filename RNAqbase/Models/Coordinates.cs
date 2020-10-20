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
				var index = C1.IndexOf(CoordinatesStart, StringComparison.Ordinal);
				sb.AppendLine("data_onquadro");
				sb.AppendLine(C1.Substring(0, index - 1));
				sb.Append(C1.Substring(index));
				sb.Append(C2.Substring(index));
				sb.Append(C3.Substring(index));
				sb.Append(C4.Substring(index));
				Console.WriteLine(sb.ToString());
				return sb.ToString();
			}
		}

		private const string CoordinatesStart = "ATOM ";
	}
}
