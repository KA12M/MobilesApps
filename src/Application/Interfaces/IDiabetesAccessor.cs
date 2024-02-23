
using MLDiabetesService;

namespace Application.Interfaces
{
    public interface IDiabetesAccessor
    {
        MLDiabetes.ModelOutput CalculateDiabetes(string fileName);
    }
}
