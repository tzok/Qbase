using System;
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
		public string Visualization2D { get; set; }
		public string Strands { get; set; }
		public int NumberOfStrands => Strands.Distinct().Count();
		public string OnzClass { get; set; }
		public DateTime PdbDeposition { get; set; }

	}
}
