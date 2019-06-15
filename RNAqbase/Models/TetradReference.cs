using RNAqbase.Enums;

namespace RNAqbase.Models
{
	public class TetradReference : BaseEntity
	{
		public int Id { get; set; }
		public int QuadruplexId { get; set; }
		public string PdbId { get; set; }
		public int AssemblyId { get; set; }
		public string Molecule { get; set; }
		public string Sequence { get; set; }
		public string Onz { get; set; }
	}
}
