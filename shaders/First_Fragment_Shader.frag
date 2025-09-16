#version 330 core
out vec4 FragColor;

in vec2 TexCoords;
in vec3 FragPos;

uniform sampler2D texture1;


void main()
{
    vec3 color = texture(texture1, TexCoords).rgb;

    FragColor = vec4(color, 1.0);
}