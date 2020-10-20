using System;
using System.Text;

namespace RNAqbase.Models
{
    public class CoordinatesQuadruplex
    {
        public string[] C1 { get; set; }
        
        public string[] C2 { get; set; }
        public string[] C3 { get; set; }
        public string[] C4 { get; set; }

        public string CoordinatesAsString
        {
            get
            {
                var sb = new StringBuilder();
                var index = C1[0].IndexOf(CoordinatesStart, StringComparison.Ordinal);
                sb.AppendLine("data_onquadro");
                sb.AppendLine(C1[0].Substring(0, index - 1));
                for (int i = 0; i < C1.Length; i++)
                {
                    sb.Append(C1[i].Substring(index));
                    sb.Append(C2[i].Substring(index));
                    sb.Append(C3[i].Substring(index));
                    sb.Append(C4[i].Substring(index));
                }
                Console.WriteLine(sb.ToString());
                return sb.ToString();
            }
        }

        private const string CoordinatesStart = "ATOM ";
    }
}
