using RNAqbase.Enums;

namespace RNAqbase.Models
{
	public class Nucleotide : BaseEntity
	{
		public int Id { get; set; }
		public Pdb Pdb { get; set; }
		public int Model { get; set; }
		public string Chain { get; set; }
		public int Number { get; set; }
		public string Icode { get; set; }
		public string Molecule { get; set; }
		public string FullName { get; set; }
		public string ShortName { get; set; }
		public GlycosidicBond GlycosidicBond { get; set; }
		public string Coordinates { get; set; }
	}
}
