#version 330 core
out vec4 FragColor;

in vec2 TexCoords;
in vec3 FragPos;
in vec3 Normal;

struct Light {
    vec3 position;
    vec3 specular;
    vec3 ambient;
    vec3 diffuse;
};
uniform Light light;
uniform vec3 viewPos;

uniform sampler2D texture_diffuse1;
uniform sampler2D texture_specular1;

void main()
{
    vec3 diffuseColor = texture(texture_diffuse1, TexCoords).rgb;
    vec3 specularColor = texture(texture_specular1, TexCoords).rgb;

    // Ambient
    vec3 ambient = light.ambient * diffuseColor;

    // Diffuse
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(light.position - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = light.diffuse * diff * diffuseColor;

    // Specular
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 h = normalize(lightDir + viewDir);
    float spec = pow(max(dot(Normal, h), 0.0), 32.0);
    vec3 specular = light.specular * spec * specularColor;

    FragColor = vec4(ambient + diffuse + specular, 1.0);
}