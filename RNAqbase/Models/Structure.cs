using System;
using System.Linq;
using Newtonsoft.Json;

namespace RNAqbase.Models
{
	public class Structure : BaseEntity
	{
		public string Quadruplex_id { get; set; }
		public string PdbId { get; set; }
		public string PdbDeposition { get; set; }
		public int AssemblyId { get; set; }
		public string Molecule { get; set; }
		public string Experiment { get; set; }
	}
}
