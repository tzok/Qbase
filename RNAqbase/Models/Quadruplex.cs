using RNAqbase.Enums;

namespace RNAqbase.Models
{
	public class Quadruplex : BaseEntity
	{
		public int Id { get; set; }
		public StrandDirection StrandDirection { get; set; }
		public string Visualization { get; set; }
	}
}
