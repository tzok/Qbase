using System.Linq;
using Newtonsoft.Json;

namespace RNAqbase.Models
{
	public class Structure : BaseEntity
	{
		public string PdbId { get; set; }
		public int AssemblyId { get; set; }
		public string Molecule { get; set; }
		public int QuadruplexId { get; set; }
		public string Experiment { get; set; }
		public string Visualization { get; set; }
		public string Strands { get; set; }
		public int NumberOfStrands => Strands.Distinct().Count();

		[JsonIgnore]
		public string OnzClass { get; set; }

	}
}
