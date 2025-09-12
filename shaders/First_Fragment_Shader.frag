#version 330 core
out vec4 FragColor;

uniform vec3 eyePos;
uniform vec3 lightPos;

struct Material{
    sampler2D diffuse;
    sampler2D specular;
    float shininess;
};

struct Light {
    vec3 position;

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

uniform Light light;
uniform Material material;

in vec2 TexCoords;
in vec3 Normal;
in vec3 FragPos;  

void main()
{
    vec3 ambient = texture(material.diffuse, TexCoords).rgb * light.ambient;

    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = light.diffuse * diff * texture(material.diffuse, TexCoords).rgb;
    
    vec3 viewDir = normalize(eyePos - FragPos);
    vec3 h = normalize(viewDir + lightDir);
    float spec = pow(max(dot(h, norm), 0.0), material.shininess);
    vec3 specular =  spec * light.specular * texture(material.specular, TexCoords).rgb;

    vec3 result = ambient + diffuse + specular;
    FragColor = vec4(result, 1.0);
}