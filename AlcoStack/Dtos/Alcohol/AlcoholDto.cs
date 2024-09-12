using AlcoStack.Enums;

namespace AlcoStack.Dtos;

public class AlcoholDto
{
    public string Name { get; set; }

    public AlcoType Type { get; set; }

    public string Photo { get; set; }

    public string Description { get; set; }

}